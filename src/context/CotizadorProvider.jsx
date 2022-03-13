import { useState, createContext } from 'react'
import { obtenerDiferenciaYear,calcularMarca, calcularPlan, formatearDinero } from '../helpers'

const CotizadorContext =createContext()

const CotizadorProvider = ({children}) => {

    const [ datos, setDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [ error, setError ] = useState('')
    const [ resultado, setResultado ] = useState('')

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una Base
        let resultado = 2000

        //Obtener Diferenci de Años
        const diferencia = obtenerDiferenciaYear(datos.year)

        //Hay que restar el 3% por cada año
        resultado -= ( (diferencia * 3) * resultado ) / 100

        //Europeo 30%
        //Americano 15%
        //Asiático 5%
        resultado *= calcularMarca(datos.marca)
        
        //Básico 20%
        //Completo 50%
        resultado *= calcularPlan(datos.plan) 
        
        //Formatear Dinero
        resultado = formatearDinero(resultado)

        setResultado(resultado)

    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )

}

export {
    CotizadorProvider
}

export default CotizadorContext