import {StatusBar} from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,Alert
} from 'react-native';
import Snackbar from 'react-native-paper/src/components/Snackbar';

export default function  InsertionShedRow({ navigation: { navigate } }) {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [dataSource,setDataSource]=useState([]);
    const [location,setLocation]=useState('');
    const [disciplineName,setDisciplineName]=useState('');
    const [hallNumber,setHallNumber]=useState('');
    const [personId,setPersonId]=useState('');
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => setVisible(false);

    const putData=()=> {
        fetch('http://10.0.2.2:8080/api/schedule/'+personId, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                Authorization: global.token
            },

            body: JSON.stringify({
                    date: date,
                    time: time,
                    duration: duration,
                    location: location,
                    disciplineName: disciplineName,
                    hallNumber: hallNumber,
                    personId:personId
                }
            )
        })
            .then(response => response.json())
            //If response is in json then in success
            .then(responseJson => {
                setDataSource(responseJson);
                //Successa
               // alert("Успех")
            })
            //If response is not in json then in error
            .catch(error => {
                //Error
                console.log('Error')
            });

    }
    const checkRow=()=>
    {
        if (date==='' || time==='' || duration==='' || location==='' || disciplineName==='' || hallNumber==='' || personId==='')
        {
            onToggleSnackBar()
        }
        else
        {
           putData()
            navigate('TableShed')
        }

    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <Image source={require('../screens/agenda.png')}  style={{width:80, height:80,marginBottom: 20}} />
            <StatusBar style="auto"/>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Дата"
                    placeholderTextColor="#808080"
                    onChangeText={date => setDate(date)}
                    keyboardType={'numeric'}


                />

            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Время"
                    placeholderTextColor="#808080"
                    keyboardType={'numeric'}
                    onChangeText={(time) => setTime(time)}


                />
            </View>


            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Длительность"
                    placeholderTextColor="#808080"
                    onChangeText={(duration) => setDuration(duration)}


                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Адрес"
                    placeholderTextColor="#808080"
                    onChangeText={(location) => setLocation(location)}


                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Дисциплина"
                    placeholderTextColor="#808080"
                    onChangeText={(disciplineName) => setDisciplineName(disciplineName)}


                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Зал"
                    placeholderTextColor="#808080"
                    keyboardType={'numeric'}
                    onChangeText={(hallNumber) => setHallNumber(hallNumber)}


                />
            </View>
            <View style={styles.inputView}>
                <TextInput

                    style={styles.TextInput}
                    placeholder="Персональный номер тренера"
                    placeholderTextColor="#808080"
                    keyboardType={'numeric'}
                    onChangeText={(personId) => setPersonId(personId)}


                />

            </View>

            <TouchableOpacity
                style={styles.loginBtn}

                onPress={() =>checkRow()

                }>
                <Text style={styles.loginText}>Добавить</Text>
            </TouchableOpacity>
            <Snackbar style={styles.snack}
                visible={visible}
                onDismiss={onDismissSnackBar}
                      duration={1000}
            >
                <Text styles={styles.snack}>Необходимо заполнить все поля</Text>
            </Snackbar>





        </View>
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        marginBottom: 40,
    },


    inputView: {
        backgroundColor: '#87CEFA',
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,

        alignItems: 'center',
    },


    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    registration_button: {
        height: 20,
        marginBottom: 0,
    },

    loginBtn: {
        width: '60%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#87CEFA',
    },
    snack:{
        backgroundColor:'#8B0000',

    },

});
