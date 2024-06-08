import { Dispatch, createContext, useContext, useReducer } from "react";

interface PositionType{
    postion: {
        La: number;
        Ma: number;
    };
    address: string;
}

interface PositionActionT {
    type : "change"
    payload : PositionType
}

const AddressStateContext = createContext<PositionType | null>(null);
const AddressDispatchContext = createContext<Dispatch<PositionActionT> | null>(null);

const reducer = (state : PositionType,action : PositionActionT) : PositionType=>{
    switch(action.type){
        case "change" :
            return {...action.payload}
        default :
            return state;
    }
}

export function AddressProvider({children} : {children : React.ReactNode}) {

    const [state,dispatch] = useReducer(reducer,{
        postion: {
            La: 0,
            Ma: 0,
        },
        address: "",
    });

    return (
        <AddressStateContext.Provider value={state}>
            <AddressDispatchContext.Provider value={dispatch}>
                {children}
            </AddressDispatchContext.Provider>
        </AddressStateContext.Provider>
    )
}

export const useAddressState = () => {
    const context = useContext(AddressStateContext);
    if(context === null){
        throw new Error('useAddressState는 AddressProvider 안에서 사용해야 합니다.');
    }
    return context;
};
export const useAddressDispatch = () => {
    const context = useContext(AddressDispatchContext);
    if(context === null){
        throw new Error('useAddressDispatch AddressProvider 안에서 사용해야 합니다.');
    }
    return context;
}