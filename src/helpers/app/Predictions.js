import JSONToQuery from './JSONToQuery'
import isEmpty from './isEmpty'
import extend from './extend'
import { map as config } from 'config'

const validationStatuses = {
  EMPTY_HOUSE_NUMBER: 'EMPTY_HOUSE_NUMBER',
  ADDRESS_IS_NOT_CHOSEN: 'ADDRESS_IS_NOT_CHOSEN',
  ADDRESS_IS_EMPTY: 'ADDRESS_IS_EMPTY',
  ADDRESS_SUCCESS: 'ADDRESS_SUCCESS',
  INVALID_REQUEST: 'INVALID_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
  REQUEST_DENIED: 'REQUEST_DENIED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  ZERO_RESULTS: 'ZERO_RESULTS'
};

const messages = {
  [validationStatuses.INVALID_REQUEST]:
    'Введеный адрес не подходит по формату.',
  [validationStatuses.NOT_FOUND]:
    'Такого адреса не существует, пожалуйста, введите свой настоящий адрес, иначе Ваше объявление не будет опубликовано.',
  get [validationStatuses.ZERO_RESULTS]() {
    return this[validationStatuses.NOT_FOUND];
  },
  [validationStatuses.OVER_QUERY_LIMIT]:
    'Вы переборщили со скоростью и превысили лимит запросов. Попробуйте позже.',
  [validationStatuses.REQUEST_DENIED]:
    'По неизвестным нам причинам, Google запретил Вам доступ к базе адресов.',
  [validationStatuses.UNKNOWN_ERROR]:
    'Произошла неизвестная ошибка.',
  [validationStatuses.EMPTY_HOUSE_NUMBER]:
    'Вы не ввели номер дома. Пожалуйста, введите полный адрес, иначе Ваше объявление не будет опубликовано.',
  [validationStatuses.ADDRESS_SUCCESS]:
    'Адрес подходит!',
  [validationStatuses.ADDRESS_IS_NOT_CHOSEN]:
    'Вы ввели несуществующий адрес. Мы не сможем опубликовать Ваше объявление.',
  [validationStatuses.ADDRESS_IS_EMPTY]:
    'Адрес не может быть пустым. Пожалуйста, введите корректный адрес, иначе Ваше объявление не будет опубликовано'
};


class Predictions {
  //url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  city = '59.9342802,30.3350986';
  url = config.url;
  key = config.apiKey;
  props = {};
  point = {};

  constructor(props) {
    extend(this.props, props);
  }

  // generate parameters which will send to google servers
  getPredictionParameters = input => ({
    input,
    types: ['address'],
    language: 'ru',
    componentRestrictions: {
      country: 'ru'
    }
  });

  // initialize google services
  initGoogleServices = () => {
    if (this.autocomplete) return;
    if (window.google && window.google.maps) {
      this.autocomplete = new google.maps.places.AutocompleteService();
      this.service = new google.maps.places.PlacesService(
        this.detailsBlock = document.createElement('div')
      );
    }
  };

  onChange = value => {
    const {autocomplete} = this;
    // if google services are not initialized
    if (!autocomplete || !autocomplete.getPlacePredictions)
      return this.initGoogleServices();

    // if value from input is empty
    if (isEmpty(value))
      return this.validate(validationStatuses.ADDRESS_IS_EMPTY);

    // get parameters
    const parameters = this.getPredictionParameters(value);

    autocomplete.getPlacePredictions(parameters, (predictions, status) => {
      const validation = this.validate(status);

      if (validation) {
        return validation;
      }

      this.setPredictions(this.filterPredictions(predictions));
    })
  };

  // filter predictions by current city.
  // google doesn't support it - can't fcn believe in it.
  filterPredictions = (predictions) => {
    return predictions.filter(
      item => item.description.indexOf(this.props.currentCity) !== -1
    )
  };

  clearPredictions = () => {
    this.setPredictions([]);
  };

  // get more details about address
  getDetails = ({reference}, cb) => {
    this.service.getDetails({reference}, cb);
  };

  // set chosen address to current
  setAddress = item => {
    const inputValue = this.convertAddress(item);

    // remove letters from input value
    // to detect house number
    const houseNumber = +inputValue.replace(/\D+/g,"");
    let lastSymbol = +inputValue[inputValue.length - 1];

    if (isNaN(lastSymbol)) {
      lastSymbol = false;
    }

    console.log({lastSymbol, houseNumber});

    // house number empty
    if (typeof houseNumber !== 'number' || typeof lastSymbol !== 'number' || houseNumber <= 0) {
      return this.validate(validationStatuses.EMPTY_HOUSE_NUMBER)
    }

    // show the point on the map
    this.showAddressOnMap(item);
    // clear predictions
    this.clearPredictions();
    // show success message
    this.validate(validationStatuses.ADDRESS_SUCCESS);

    // callback
    //this.setPoint(item, inputValue);

    return false;
  };

  setPoint = (point, value) => {
    this.point = point;

    if (point.position && this.props.setPoint) {
      this.props.setPoint(point, true);
    }

    if (typeof value === 'function') {
      value();
    }
  };

  showAddressOnMap = item => {
    // if current point already has set
    if (this.point.id === item.id) return;

    const setDetails = () => this.getDetails(item, (data, status) => {
      const validation = this.validate(status);

      if (validation) {
        return validation;
      }

      const {geometry: {location}} = data;
      this.setPoint({
        position: [location.lat(), location.lng()],
        name: this.convertAddress(item),
        id: item.id
      })
    });

    this.setPoint({
      id: item.id
    }, setDetails);
  };

  // remove info that user don't need
  convertAddress = props => {
    const { terms, structured_formatting, name } = props;

    if (structured_formatting) {
      return structured_formatting.main_text
    }

    if (name) {
      return name
    }

    const max = terms.length - 2;
    const divider = ', ';
    const empty = '_';
    const string = (terms.map(({value}, index) => {
      if (index < max) {
        return value;
      }

      return empty
    }).join(divider));

    return string.replace(new RegExp(divider + empty, 'gi'), '')
  };

  // navigateOnPredictions = direction => {
  //   const max = this.items.filter(item => item != null).length -1;
  //   let index = this.navigate || 0;
  //
  //   if (direction == null) {
  //     return this.setAddress(this.items[index].dataItem);
  //   }
  //
  //   if (direction) {
  //     index++
  //   } else {
  //     index--
  //   }
  //
  //   if (index > max) {
  //     index = 0;
  //   } else if (index < 0) {
  //     index = max;
  //   }
  //
  //   this.items.forEach((item, key) => {
  //     if (!item) return;
  //
  //     if (key === index) {
  //       this.navigate = key;
  //
  //       return item.className = classNames(
  //         s.predictions__item, s.predictions__item_active
  //       );
  //     }
  //     console.log({className: s.predictions__item_inactive, items: this.items, item})
  //     return item.className = classNames(
  //       s.predictions__item, s.predictions__item_inactive
  //     );
  //   })
  // };
  //
  // onKeyPress = e => {
  //   if (e.type.toLowerCase().indexOf('down') === -1) return;
  //   const key = e.keyCode || e.charCode;
  //   const prevent = () => {
  //     e.preventDefault();
  //
  //     return false;
  //   };
  //
  //   if (!isEmpty(this.items) && (key === 40 || key === 38 || key === 13)) {
  //     let dir;
  //
  //     if (key === 40 || key === 38) {
  //       dir = key === 40;
  //     }
  //
  //     this.navigateOnPredictions(dir);
  //
  //     return prevent();
  //   }
  //
  //   if (key === 13) {
  //     return prevent();
  //   }
  // };

  setMessage = (content, isError = true, isSuccess = false) => {
    const message = this.message = {content, isError, isSuccess};
    this.props.setMessage(message);
    return true;
  };

  setPredictions = data => {
    this.props.setPredictions(this.predictions = data)
  };

  validate = status => {
    const {
      INVALID_REQUEST,
      NOT_FOUND, OVER_QUERY_LIMIT,
      REQUEST_DENIED, UNKNOWN_ERROR, ZERO_RESULTS,
      EMPTY_HOUSE_NUMBER, ADDRESS_IS_NOT_CHOSEN,
      ADDRESS_IS_EMPTY, ADDRESS_SUCCESS
    } = validationStatuses;


    switch (status) {
      case NOT_FOUND:
      case ZERO_RESULTS:
      case INVALID_REQUEST:
      case OVER_QUERY_LIMIT:
      case REQUEST_DENIED:
      case UNKNOWN_ERROR:
      case EMPTY_HOUSE_NUMBER:
      case ADDRESS_IS_EMPTY:
        return this.setMessage(
          messages[status]
        );
      case ADDRESS_SUCCESS:
        return this.setMessage(
          messages[status],
          // isError
          false,
          // isSuccess
          true
        );
      case ADDRESS_IS_NOT_CHOSEN:
        // TODO: check on exist and show if not
        return this.setMessage(
          messages[status]
        );
      default:

        return null;
    }
  };
}

export default window.Predictions = Predictions;
