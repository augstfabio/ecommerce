import { createContext, useReducer, useContext, useState, useEffect } from "react";

const ItemsContext = createContext();
export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (state.find(item => item.productId === action.payload.id)) {
                return state;
            }

            return [
                ...state,
                {
                    productId: action.payload.id,
                    quantity: 1
                }
            ];

        case 'REMOVE_ITEM':
            return state.filter((product) => product.productId !== action.payload.id);

        case 'ADD_QUANTITY':
            return state.map((product) => {
                if (product.productId === action.payload.id) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            }).filter((product) => product.quantity > 0);

        case 'RM_QUANTITY':
            return state.map((product) => {
                if (product.productId === action.payload.id && product.quantity > 0) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            }).filter((product) => product.quantity > 0);

        default:
            return state;
    }
};
export const CartProvider = ({ children }) => {

    const [qtd, setQtd] = useState()
    const [allData, setAllData] = useState(null);
    const [dataCartItems, setDataCartItems] = useState([])

    const [cartItems, dispatch] = useReducer(reducer, [], () => {
        try {
            const item = window.localStorage.getItem('cartItems');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });

    const addItem = (data) => {
        if (data) {
            dispatch({ type: "ADD_ITEM", payload: { id: data.id } });
        }
    };
    const rmItem = (data) => {
        if (data) {
            dispatch({ type: "REMOVE_ITEM", payload: { id: data.id } });
        }
    };
    const addQtd = (data) => {
        if (data) {
            dispatch({ type: "ADD_QUANTITY", payload: { id: data.id } });
        }
    };
    const rmQtd = (data) => {
        if (data) {
            dispatch({ type: "RM_QUANTITY", payload: { id: data.id } });
        }
    }

    useEffect(() => {
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
        const fetchItems = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products')
                const json = await res.json()
                const filteredItems = cartItems.map(cartItem => {
                    return json.find(item => item.id === cartItem.productId);
                }).filter(item => item !== undefined);
                setDataCartItems(filteredItems);
            } catch (error) {
                console.log(error)
            }
        }
        setQtd(cartItems.length)
        fetchItems()
      
    }, [cartItems, dispatch]);

    return (
        <ItemsContext.Provider value={{ allData, cartItems, addItem, rmItem, addQtd, rmQtd, setAllData, dataCartItems, qtd }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useCart = () => {
    return useContext(ItemsContext);
};
