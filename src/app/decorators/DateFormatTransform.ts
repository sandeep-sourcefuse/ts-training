import moment from 'moment';

export function DateFormatTransform(propertyKey: string, format: string = "DD/MM/YYYY hh:mm a"): any {
    return function (target: any, key: string) {        
        Object.defineProperty(target, key, {
            configurable: false,
            get: function(){
                return moment(this[propertyKey]).format(format);
            }
        });
    }
}