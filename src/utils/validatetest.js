// const rulesDemo = {
//     name: [ ==> filed key
//       {
//         required: true,
//         message: "Vui lòng nhập tên",
//       }, ==> "này gọi là rule"
//     ],
//     email: [ ==> filed key
//       {
//         required: true,
//         message: "Vui lòng nhập email",
//       }, ==> "này gọi là rule 1 - required rule"
//       {
//         regrex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//         message: "Vui lòng nhập đúng định dạng email",
//       }, ==> "này gọi là rule 2 - regrex rule"
//     ],
//     phone: [
//         {
//             required: true,
//             message: "Vui lòng điền phone",
//         },
//         {
//              regrex: "phone", => C1: kiểu gia trị (được mình quy định - đăt tên cho pattern) & bên validate.js sẽ xử lí, còn việc lấy ra mã regrex đó thì nằm trong const REGREX
//             // regrex: "/(84|0[3|5|7|8|9])+([0-9]{8})\b/", => C3: bỏ trong string, chuỗi nè
//             // regrex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, => C2: regrex bình thường
//
//             message: "Vui lòng nhập đúng định dạng phone",
//         },
//     ],
//   };

const REGREX = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

const validate = (rules, values) => {
    // console.log("rules", rules);
    console.log("values", values);

    const errObj = {};

    for (const ruleKey in rules) {
        // console.log("ruleKey", ruleKey);
        for (const rule of rules[ruleKey]) {
            // console.log("rule", rule);

            // Case: reqired rule
            if (rule.required) {
                // check required - nếu mà ko có giá trị - value đó rỗng - thì hiển message lỗi lên
                if (!!!values[ruleKey]) {
                    errObj[ruleKey] = rule.message || "Vui lòng nhập";
                    // name = rule.message || "Vui lòng nhập";
                    // email = rule.message || "Vui lòng nhập";
                    break;
                }
            }

            // // Case: regrex rule 1
            // if (rule.regrex && values[ruleKey]) {
            //     // check regrex - nếu mà nó không max - không đúng format của regrex - thì hiển lỗi lên
            //     if (!rule.regrex.test(values[ruleKey])) {
            //         errObj[ruleKey] =
            //             rule.message || "Vui lòng nhập đúng định dạng";
            //         break;
            //     }
            // }
            // Case: regrex rule 2 - with REGREX
            if (rule.regrex && values[ruleKey]) {
                let pattern = "";
                // C1: kiểm tra rule.regrex ("name" || "email") này có phải là key có trong REGREX hay ko?
                if (rule.regrex in REGREX) {
                    pattern = REGREX[rule.regrex];
                    // C2: kiểm tra rule.regrex có typeof là RegExp hay ko?
                } else if (rule.regrex instanceof RegExp) {
                    pattern = rule.regrex;
                    // C3: kiểm tra nếu truyên vào dạng string regrex á, thì biến đổi no thành regrex
                    // la nhập kiểu: regrex: "/(84|0[3|5|7|8|9])+([0-9]{8})\b/" - bỏ trong dấu nhấy đó ""
                    // chứ không phải nhập này: regrex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/
                    // thì ta sẽ phải check cho nó từ kiểu string đó sang regrex
                    // và trường hợp này hiếm có, mà cũng xử lí vào cho chắc
                } else {
                    pattern = new RegExp(rule.regrex, "gi");
                }
                // check regrex
                if (!pattern.test(values[ruleKey])) {
                    errObj[ruleKey] =
                        rule.message || "Vui lòng nhập đúng định dạng";
                    break;
                }

                // pattern là gì? là cái mã /(84|0[3|5|7|8|9])+([0-9]{8})\b/ như này nè
                // values[ruleKey] là giá trị
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
