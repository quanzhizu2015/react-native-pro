import React, {useState,useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {screenW} from '../../../comm/Unitl';

const CELL_COUNT = 6;

 const UnderlineInput = (props) => {

    const {changeValue} = props;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    function onChangeText(text){
        changeValue(text)
        setValue(text)

     }



    return (
        <View  style={{height: 60}}>
            <CodeField
                ref={ref}
                {...prop}
                value={value}
                onChangeText={(text)=>{onChangeText(text)}}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default UnderlineInput;

const styles =StyleSheet.create({
    root: {padding: 20, minHeight: 300},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {
        marginTop: 0,
        width: screenW-50-80,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 20,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 3,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#383838',
        borderBottomWidth: 3,
    },
});
