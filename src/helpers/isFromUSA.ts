const isFromUSA  = (phoneNumber?: string) => phoneNumber ? phoneNumber[1] === '1' : false;
export default isFromUSA ;
