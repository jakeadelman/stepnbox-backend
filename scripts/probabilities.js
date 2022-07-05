async function getPr(data){
    
    return new Promise(function(resolve,reject){

        // console.log(data)\
        let newArr = []
        let bottomTime = 0;
        let resultArray = [];

        // for (let i=0; i<data.length;i++){
            console.log(data)
            // let ids = {};
            

        data.map(item=>{
            if(resultArray.find(object=>{
                if (object.gem1luck== item.gem1luck && object.gem1efficiency==item.gem1efficiency && object.gem1resillience==item.gem1resillience && object.gem1comfort==item.gem1comfort && object.gst==item.gst){
                    object.times++
                    return true
                } else{
                    return false
                }
            }))
            {}else{
                item.times=1;
                resultArray.push(item)
            }
        })
        console.log(resultArray)

            // console.log(resultArray.length)
            
        // }

        for (let i=0;i<resultArray.length;i++){
            if(newArr.length<1){
                bottomTime=resultArray[i].times
            }


            if(newArr.length<5){
                    newArr.push(resultArray[i])
                    console.log("pushing"+newArr.length.toString())
                    if(resultArray[i].times<bottomTime){
                        bottomTime=resultArray[i].times
                    }
                    // console.log(newArr)
                    // console.log("new")
                    
            }else{


                if (bottomTime<resultArray[i].times){

                    // delete lowest value
                    let index = newArr.findIndex(x=>x.times==bottomTime)
                    console.log(index)
                    // newArr.push(resultArray[i])
                    newArr.splice(index, 1, resultArray[i])
                    // console.log(newArr)

                    //set new bottom time and push new result to array
                    let num = 0;
                    for (let h=0;h<newArr.length;h++){
                        if(h==0){
                            num=newArr[0].times
                        }else if(newArr[h].times<num){
                            num=newArr[h].times
                        }
                        bottomTime =num
                    }
                    

                }


            }
        
            

        }

        // console.log(newArr)
        let final = getPercent(newArr)
        console.log(final)
        resolve(final)
    })


}

async function getPercent(data){
    //Assign percentages
    let allTimes = 0
    for (let i=0;i<data.length;i++){
        // add all times
        
        allTimes = allTimes+data[i].times

    }

    //get individual percentages
    let finalArr=[];
    for (let i=0;i<data.length;i++){
        let percent = data[i].times/allTimes;
        console.log(percent)
        data[i].percent=percent
        finalArr.push(data[i])
    }

    // console.log(finalArr)

    finalArr = finalArr.sort(function(a,b){
        return b.percent - a.percent
    })


    // console.log(finalArr)
    return finalArr;

}


module.exports = {getPr}