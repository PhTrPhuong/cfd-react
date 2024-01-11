import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/store/actions/counterAction";
import { fetchRandomDog } from "@/store/actions/dogAction";

const ReduxPage = () => {
    const { counter } = useSelector((state) => state.counter);
    const dog = useSelector((state) => state.dog);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRandomDog());
    }, []);

    const _onRandomImg = () => {
        dispatch(fetchRandomDog());
    };

    return (
        <main className="mainwrapper" style={{ paddingTop: 140 }}>
            {/* Ứng dụng Counter */}
            <div>
                <h1>Counter: {counter}</h1>
                <button onClick={() => dispatch({ type: "DECREMENT", payload: 5 })}>
                    - Decrement
                </button>
                <button onClick={() => dispatch({ type: "INCREMENT", payload: 5 })}>
                    + Increment
                </button>
                <button onClick={() => dispatch(decrement(10))}>-10 Decrement</button>
                <button onClick={() => dispatch(increment(10))}>+10 Increment</button>
            </div>

            <br />
            <br />

            {/* Dispatch function action call API get Dog image */}
            <div>
                {dog?.message ? (
                    <img src={dog.message} atl="" onClick={() => _onRandomImg()} />
                ) : (
                    <p>Không tìm thấy ảnh cún nào!</p>
                )}
            </div>
        </main>
    );
};

export default ReduxPage;
