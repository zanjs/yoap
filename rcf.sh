# React Stateless component
DEFAULT_COMPONENT_FOLDER="components"

echo -n 'Enter the name of the Component: '
read ComponentName
echo -n "Output folder path relative to ./src (default: $DEFAULT_COMPONENT_FOLDER): "
read Output

if [ "$Output" = "" ]
then
  Output="$DEFAULT_COMPONENT_FOLDER"
fi


ABS_PATH=`cd "$1"; pwd` # gets the absolute path of the directory in which the script is saved
COMPONENT_PATH="$ABS_PATH/src/$Output/$ComponentName"
COMPONENT_FILE="$COMPONENT_PATH/$ComponentName"

# echo "$ABS_PATH/src/$Output/$ComponentName/$ComponentName.js"

if [ -e "$COMPONENT_FILE.js" ]
  then echo "File named $ComponentName already exists in the '$COMPONENT_PATH' folder"
else
  echo

mkdir $COMPONENT_PATH;
touch "$COMPONENT_FILE.js";
echo "import React, { Component } from 'react'
import s from './$ComponentName.sass'


const $ComponentName = () => {
  return (
    <div className={s.${ComponentName,,}}></div>
  )
};

export default $ComponentName;
" >> "$COMPONENT_FILE.js";

touch "$COMPONENT_FILE.sass";
echo "@import ../../theme/index


" >> "$COMPONENT_FILE.sass";



# open "$COMPONENT_FILE.js"
echo "Created $COMPONENT_PATH"
fi
