window.onload = () =>{
            
    let time = new Date('7 12 2023 23:30:45')
    Days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
    Months = ['Jan','Feb','March','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    displayDate = `${Days[time.getDay()]} ${nthNumber(time.getDate())} ${Months[time.getMonth()]}, ${time.getFullYear()}`
    displayTime = `${timeFormat(time.getHours())}:${time.getMinutes()}:${time.getSeconds()} ${ampm(time.getHours())}`
    document.querySelector('#date').innerHTML = 'Date: '+displayDate
    // document.querySelector('#time').innerHTML = 'Time: '+displayTime
    tickTime()
}

//function definitions
    //function to add ordinal suffix
    const nthNumber = (number) => {
        if (number > 3 && number < 21) return number+"th";
            switch (number % 10) {
                case 1:
                return number+"st";
                case 2:
                return number+"nd";
                case 3:
                return number+"rd";
                default:
                return number+"th";
            }
        };

        const tickTime = (format = 12) => {
            setInterval(()=>{
                time = new Date()
                if(format === 12){
                    output = `${timeFormat(time.getHours())}:${time.getMinutes()}:${time.getSeconds()} ${ampm(time.getHours())}`
                }
                else{
                    output = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
                }
                document.querySelector('#time').innerHTML = 'Time: '+output;
            },1000)
            
        }

    const timeFormat = (number) => {
        if(number > 12){
            return number % 12
        }

        if(number == 0) return number + 12

        return number
    }

    const ampm = number => {
        return (parseInt(number) >= 12) ? 'pm' : 'am' 
    }