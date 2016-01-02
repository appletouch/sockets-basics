/**
 * Created by PKoolwijk on 2-1-2016.
 */


//*******USING MOMENTS**********

var moment =require('moment');
var now = moment();

console.log(now.format());
console.log(now.format('h:mm a'));    //custom time

now.add(1,'year');         // add year to current time
console.log(now.format());

var now = moment();
console.log(now.format('MMM Do, h:mm a'));    //custom day and time

console.log(now.format('X'));  ///time to unix timestamp (seconds sinds Thu, 01 Jan 1970 00:00:00 GMT)
console.log(now.format('x'));   //// milliseconds sinds Thu, 01 Jan 1970 00:00:00 GMT
console.log(now.valueOf());   ///numeric output for calculations

timestamp= 1451767271506;
var timeStampMoment=moment.utc(timestamp);
console.log(timeStampMoment.format('HH:mm'))
/*
 Format Dates
 moment().format('MMMM Do YYYY, h:mm:ss a'); // January 2nd 2016, 7:28:11 pm
 moment().format('dddd');                    // Saturday
 moment().format("MMM Do YY");               // Jan 2nd 16
 moment().format('YYYY [escaped] YYYY');     // 2016 escaped 2016
 moment().format();                          // 2016-01-02T19:28:11+01:00

 Relative Time
 moment("20111031", "YYYYMMDD").fromNow(); // 4 years ago
 moment("20120620", "YYYYMMDD").fromNow(); // 4 years ago
 moment().startOf('day').fromNow();        // 19 hours ago
 moment().endOf('day').fromNow();          // in 5 hours
 moment().startOf('hour').fromNow();       // 28 minutes ago

 Calendar Time
 moment().subtract(10, 'days').calendar(); // 12/23/2015
 moment().subtract(6, 'days').calendar();  // Last Sunday at 7:28 PM
 moment().subtract(3, 'days').calendar();  // Last Wednesday at 7:28 PM
 moment().subtract(1, 'days').calendar();  // Yesterday at 7:28 PM
 moment().calendar();                      // Today at 7:28 PM
 moment().add(1, 'days').calendar();       // Tomorrow at 7:28 PM
 moment().add(3, 'days').calendar();       // Tuesday at 7:28 PM
 moment().add(10, 'days').calendar();      // 01/12/2016

 Multiple Locale Support
 moment().format('L');    // 01/02/2016
 moment().format('l');    // 1/2/2016
 moment().format('LL');   // January 2, 2016
 moment().format('ll');   // Jan 2, 2016
 moment().format('LLL');  // January 2, 2016 7:29 PM
 moment().format('lll');  // Jan 2, 2016 7:29 PM
 moment().format('LLLL'); // Saturday, January 2, 2016 7:29 PM
 moment().format('llll'); // Sat, Jan 2, 2016 7:29 PM


 */
