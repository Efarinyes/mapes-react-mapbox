


export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise( (resolve, reject ) => {
        navigator.geolocation.getCurrentPosition(
           ({ coords}) => {
            resolve([ coords.longitude, coords.latitude])
           },
           (err ) => {
            alert('No podem obtenir la teva geolocalització')
            console.log(err);
            reject();
           }
        )
    })
}