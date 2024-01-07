const REGREX = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
};

const validate = (rules, values) => {
    const errObj = {};

    for (const ruleKey in rules) {
        for (const rule of rules[ruleKey]) {
            // Case: reqired rule
            if (rule.required) {
                // check required
                if (!!!values[ruleKey]) {
                    errObj[ruleKey] = rule.message || "Vui lòng nhập";
                    break;
                }
            }
            // Case: regrex rule - with REGREX
            if (rule.regrex && values[ruleKey]) {
                let pattern = "";
                if (rule.regrex in REGREX) {
                    pattern = REGREX[rule.regrex];
                } else if (rule.regrex instanceof RegExp) {
                    pattern = rule.regrex;
                } else {
                    pattern = new RegExp(rule.regrex, "gi");
                }
                // check regrex
                if (!pattern.test(values[ruleKey])) {
                    errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
                    break;
                }
            }
            //  Case: Function
            if (typeof rule === "function") {
                const message = rule(values[ruleKey], values, errObj);
                console.log("message", message);
                if (!!message) {
                    errObj[ruleKey] = message || "Dữ liệu nhập sai yêu cầu";
                    break;
                }
            }
        }
    }

    console.log("errObj", errObj);

    return errObj;
};

export const requireRule = (message) => {
    return {
        required: true,
        message,
    };
};
export const regrexRule = (regrex, message) => {
    return {
        regrex,
        message,
    };
};

export default validate;
