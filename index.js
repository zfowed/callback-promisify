/**
 * @Author: zfowed
 * @Date: 2018-02-25 21:41:13
 * @Last Modified by: zfowed
 * @Last Modified time: 2018-02-26 07:33:55
 */



'use strict';



(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.callbackPromisify = factory());
})(this, function () {

    var callbackPromisify = function callbackPromisify(func, isFirstError, argsMark, self) {

        isFirstError = isFirstError !== undefined ? isFirstError : true;
        argsMark = argsMark !== undefined ? argsMark : 0;

        if (Array.isArray(argsMark)) {
            argsMark = argsMark.map(function (arg) {
                return '' + arg;
            });
        }

        return function () {
            for (var _len = arguments.length, allArgs = Array(_len), _key = 0; _key < _len; _key++) {
                allArgs[_key] = arguments[_key];
            }

            return new Promise(function (resolve, reject) {

                var argsLength = void 0,
                    args = void 0,
                    callback = void 0;

                if (typeof argsMark === 'number' && argsMark > 0) {
                    argsLength = argsMark;
                } else if (Array.isArray(argsMark)) {
                    argsLength = argsMark.length;
                }

                args = allArgs.slice(0, argsLength);

                args.push(function () {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    var error = isFirstError ? args.splice(0, 1)[0] : null;

                    var result = args;

                    if (Array.isArray(argsMark)) {
                        result = {};
                        for (var i = 0; i < argsMark.length; i++) {
                            var mark = argsMark[i];
                            result[mark] = args[i];
                        }
                    } else if (argsLength === 1) {
                        result = args[0];
                    }

                    return error ? reject(error) : resolve(result);
                });

                return func.apply(self, args);
            });
        };
    };


    return callbackPromisify;

});