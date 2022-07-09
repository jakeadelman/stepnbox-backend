async function getPr1(data) {
  return new Promise(function (resolve, reject) {
    let resultArray = [];

    data.map((item) => {
      let isFound = resultArray.find((object) => {
        object.gem1luck == item.gem1luck &&
          object.gem1efficiency == item.gem1efficiency &&
          object.gem1resillience == item.gem1resillience &&
          object.gem1comfort == item.gem1comfort &&
          object.gst == item.gst &&
          object.commonScroll == item.commonScroll &&
          object.uncommonScroll == item.uncommonScroll;
      });
      if (isFound == undefined) {
        item.times = 1;
        resultArray.push(item);
      } else {
        item.times++;
      }
    });
    let newArr = getArray(resultArray);
    let final = getPercent(newArr);
    resolve(final);
  });
}

async function getPr2(data) {
  return new Promise(function (resolve, reject) {
    let resultArray = [];

    data.map((item) => {
      const isFound = resultArray.find((object) => {
        object.gem1luck == item.gem1luck &&
          object.gem1efficiency == item.gem1efficiency &&
          object.gem1resillience == item.gem1resillience &&
          object.gem1comfort == item.gem1comfort &&
          object.gst == item.gst &&
          object.commonScroll == item.commonScroll &&
          object.uncommonScroll == item.uncommonScroll &&
          object.rareScroll == item.rareScroll &&
          object.gem2efficiency == item.gem2efficiency &&
          object.gem2luck == item.gem2luck &&
          object.gem2resillience == object.gem2resillience &&
          object.gem2comfort == object.gem2comfort;
      });
      if (isFound == undefined) {
        item.times = 1;
        resultArray.push(item);
      } else {
        item.times++;
      }
    });
    let newArr = getArray(resultArray);
    let final = getPercent(newArr);
    resolve(final);
  });
}

async function getPr3(data) {
  return new Promise(function (resolve, reject) {
    let resultArray = [];
    // console.log(data);
    data.map((item) => {
      const isFound = resultArray.find((object) => {
        object.gem1luck == item.gem1luck &&
          object.gem1efficiency == item.gem1efficiency &&
          object.gem1resillience == item.gem1resillience &&
          object.gem1comfort == item.gem1comfort &&
          object.gst == item.gst &&
          object.commonScroll == item.commonScroll &&
          object.uncommonScroll == item.uncommonScroll &&
          object.rareScroll == item.rareScroll &&
          object.gem2efficiency == item.gem2efficiency &&
          object.gem2luck == item.gem2luck &&
          object.gem2resillience == object.gem2resillience &&
          object.gem2comfort == object.gem2comfort &&
          object.epicScroll == object.epicScroll &&
          object.gem3efficiency == object.gem3efficiency &&
          object.gem3luck == object.gem3luck &&
          object.gem3resillience == object.gem3resillience &&
          object.gem3comfort == object.gem3comfort;
      });

      if (isFound == undefined) {
        item.times = 1;
        resultArray.push(item);
      } else {
        item.times++;
      }
    });

    // console.log(resultArray);
    let newArr = getArray(resultArray);

    let final = getPercent(newArr);
    console.log(final);
    resolve(final);
  });
}

const getArray = (resultArray) => {
  let newArr = [];
  let bottomTime = 0;
  for (let i = 0; i < resultArray.length; i++) {
    if (newArr.length < 1) {
      bottomTime = resultArray[i].times;
    }

    if (newArr.length < 20) {
      newArr.push(resultArray[i]);
      // console.log("pushing" + newArr.length.toString());
      if (resultArray[i].times < bottomTime) {
        bottomTime = resultArray[i].times;
      }
      // console.log(newArr)
      // console.log("new")
    } else {
      if (bottomTime < resultArray[i].times) {
        // delete lowest value
        let index = newArr.findIndex((x) => x.times == bottomTime);

        newArr.splice(index, 1, resultArray[i]);

        //set new bottom time and push new result to array
        let num = 0;
        for (let h = 0; h < newArr.length; h++) {
          if (h == 0) {
            num = newArr[0].times;
          } else if (newArr[h].times < num) {
            num = newArr[h].times;
          }
          bottomTime = num;
        }
      }
    }
  }
  return newArr;
};

async function getPercent(data) {
  //Assign percentages
  let allTimes = 0;
  for (let i = 0; i < data.length; i++) {
    // add all times

    allTimes = allTimes + data[i].times;
  }

  //get individual percentages
  let finalArr = [];
  for (let i = 0; i < data.length; i++) {
    let percent = data[i].times / allTimes;
    // console.log(percent);
    data[i].percent = percent;
    finalArr.push(data[i]);
  }

  finalArr = finalArr.sort(function (a, b) {
    return b.percent - a.percent;
  });
  //   console.log(finalArr.length);
  return finalArr;
}

module.exports = { getPr1, getPr2, getPr3 };
