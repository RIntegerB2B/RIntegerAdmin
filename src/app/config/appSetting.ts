import { environment } from '../../environments/environment';
export const AppSetting: AppSettingType = {
    awsServiceUrl: 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3001/',
    local3010BuyerServiceUrl: 'http://localhost:3012/',
    /* serviceUrl: 'http://localhost:3012/', */
    /* serviceOperation: 'http://localhost:3041/', */
    serviceUrl: environment.serviceUrl,
    serviceUrlOperation: environment.serviceUrlOperation,
    imageUrl: environment.imageUrl
};

