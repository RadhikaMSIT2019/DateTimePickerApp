import React, { useState } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, FlatList, Alert,TextInput,Button } from 'react-native';
import  Header  from './components/header';
import TodoItem from './components/todoItem';
import AddTodo  from './components/addTodo';

const App = () => {
const [date, setDate] = useState(new Date());
const [time, setTime] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const [todos,setTodos]=useState([
        {text:'buy coffee',key:'1'},
        {text:'create an app',key:'2'},
        {text:'play on switch',key:'3'}
    ]);

    const pressHandler =(key) =>{
        setTodos((prevTodos) => {
            
            return prevTodos.filter(todo=>todo.key!=key);
        });
        
    }

    const submitHandler=(text) =>{

        if(text.length > 3 ){

            setTodos((prevTodos) => {
                return [
                    {text: text,key:Math.random().toString() },
                    ...prevTodos
                ];
            });
        } 
    }

const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
    const currentDate = selectedValue || new Date();
    setDate(currentDate);
    setMode('time');
    setShow(Platform.OS !== 'ios');
    } else {
    const selectedTime = selectedValue || new Date();
    setTime(selectedTime);
    setShow(Platform.OS === 'ios');
    setMode('date');
    }
};

const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
};

const showDatepicker = () => {
    showMode('date');
};

return (
    <View style={styles.container}>
            {/*header*/}
            <Header/>
            
            <View style={styles.content}>
                {/*to form*/}
            <AddTodo submitHandler = {submitHandler}/>
            
                <View style={styles.list}>
                    <FlatList
                        data= {todos}
                        renderItem={({item}) =>(
                            // <Text>{item.text}</Text>
                            // <TodoItem item ={item}/>       
                            
                        <TodoItem item={item}pressHandler={pressHandler}  /> 
                        )}
                        />

                <View style={{ marginTop: 100 }}>
    <TouchableOpacity onPress={showDatepicker}>
        <Text style={{fontSize: 50}}>{formatDate(date, time)}</Text>
    </TouchableOpacity>
    {show && (
        <DateTimePicker
        testID='dateTimePicker'
        timeZoneOffsetInMinutes={0}
        value={date}
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange}
        />
    )}
                    </View>

                </View>
            </View>    
        </View>


    );
}   


const formatDate = (date, time) => {
return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};

const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#fff',
        },
        content:{
            padding:40,
        },
        list:{
            marginTop:20,
        }
    });

    
export default App;