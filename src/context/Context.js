import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const Context = React.createContext();

export const Provider = ({ children }) => {

    const [logged, setLogged] = useState('0');
    const [invitado, setInvitado] = useState('0');
    const [usuario, setUsuario] = useState(null);
    const [obituario, setObituario] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [jsonPlanes, setJsonPlanes] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [numeroEmergencia, setNumeroEmergencia] = useState('018000915286');
    const [linksPagos, setLinksPagos] = useState([]);

    const setUp = async (callback) => {
        try {
            const mUsuario = await AsyncStorage.getItem('usuario');
            const mLogged = await AsyncStorage.getItem('logged');
            const mInvitado = await AsyncStorage.getItem('invitado');
            if (mUsuario !== null) {
                setUsuario(JSON.parse(mUsuario));
            }
            if (mLogged !== null) {
                setLogged(mLogged);
            }
            if (mInvitado !== null) {
                setInvitado(mInvitado);
            }
            getLinksPagos();
            callback();
        } catch (e) {
            console.log(e);
        }
    }

    const modifyUsuario = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('usuario', jsonValue);
            setUsuario(value)
        } catch (e) {
            // save error
        }
    }

    const modifyLogged = async (value) => {
        try {
            await AsyncStorage.setItem('logged', value);
            setLogged(value);
        } catch (e) {
            // save error
        }
    }

    const modifyInvitado = async (value) => {
        try {
            await AsyncStorage.setItem('invitado', value);
            setInvitado(value);
        } catch (e) {
            // save error
        }
    }

    const getPlanes = async (cc) => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getAsegurado.php?cedula=${cc}`);
            let json = await response.json();
            setPlanes(json);
        } catch (error) {
            console.error(error);
        }
    };

    const getBeneficiarios = async (cc) => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getBeneficiarios.php?cedula=${cc}`);
            let json = await response.json();
            setBeneficiarios(json);
        } catch (error) {
            console.error(error);
        }
    };

    const getObituario = async (cc) => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getAsegurado.php?cedula=${cc}`);
            let json = await response.json();
            //console.log(json);
            setObituario(json.results);
        } catch (error) {
            console.error(error);
        }
    };

    const getSedes = async (cc) => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/`);
            let json = await response.json();
            //console.log(json);
            setSedes(json.results);
        } catch (error) {
            console.error(error);
        }
    };

    const getJsonPlanes = async (cc) => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/`);
            let json = await response.json();
            //console.log(json);
            setJsonPlanes(json.results);
        } catch (error) {
            console.error(error);
        }
    };

    const getLinksPagos = async () => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getParametros.php?parametro=linkpagos1`);
            let json = await response.json();
            setLinksPagos(json);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Context.Provider value={{
            setUp,
            modifyInvitado,
            modifyLogged,
            modifyUsuario,
            getObituario,
            getPlanes,
            getBeneficiarios,
            getJsonPlanes,
            getSedes,
            getLinksPagos,
            sedes,
            jsonPlanes,
            usuario,
            invitado,
            logged,
            obituario,
            planes,
            beneficiarios,
            numeroEmergencia,
            linksPagos,
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;