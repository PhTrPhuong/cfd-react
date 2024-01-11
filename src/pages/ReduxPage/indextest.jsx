import React from "react";
import { connect } from "react-redux";
import { increment, decrement } from "@/store/actions/counterAction";

const ReduxPage = (props) => {
    console.log("props", props);
    const { counter, increment, decrement } = props;

    return (
        <main className="mainwrapper" style={{ paddingTop: 140 }}>
            <div>
                <h1>Counter: {counter}</h1>
                <button onClick={() => decrement()}>- Decrement</button>
                <button onClick={() => increment()}>+ Increment</button>
                <button onClick={() => increment(10)}>+10 Increment</button>
                <button onClick={() => decrement(10)}>-10 Decrement</button>
            </div>
        </main>
    );
};

const mapStateToProps = (state) => {
    return {
        counter: state,
    };
};

export default connect(mapStateToProps, { increment, decrement })(ReduxPage);
