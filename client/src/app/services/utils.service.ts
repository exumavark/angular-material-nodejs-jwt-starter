import { Injectable } from '@angular/core';
import * as clone from 'clone';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   constructor(private snackBar: MatSnackBar) { }

   areaTypeText(areaTypeId: number) {
      switch (areaTypeId) {
         case 1: return "Point";
      }
      return "Unknown";
   }

   dateToYyyyMmDdd(d: Date) {
      try {
         if (typeof d == "string") {
            d = new Date(d);
         }
         let result: string = d.getFullYear().toString();
         if (d.getMonth() < 9) {
            result += "-0";
         }
         else {
            result += "-";
         }
         result += (d.getMonth() + 1).toString();
         if (d.getDate() < 10) {
            result += "-0";
         }
         else {
            result += "-";
         }
         result += d.getDate().toString();

         return result;
      }
      catch (e) {
         console.error(e);
         return "";
      }
   }

   dateToYyyyMmDddHhMmSs(d: Date) {
      try {
         if (typeof d == "string") {
            d = new Date(d);
         }
         let result: string = this.dateToYyyyMmDdd(d);

         if (d.getHours() < 9) {
            result += " 0";
         }
         else {
            result += " ";
         }
         result += (d.getHours()).toString();

         if (d.getMinutes() < 10) {
            result += ":0";
         }
         else {
            result += ":";
         }
         result += d.getMinutes().toString();

         if (d.getSeconds() < 10) {
            result += ":0";
         }
         else {
            result += ":";
         }
         result += d.getSeconds().toString();

         return result;
      }
      catch (e) {
         console.error(e);
         return "";
      }
   }

   deepClone<T>(value): T {
      return clone<T>(value);
   }

   htmlEncode(input): any {
      return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
   }

   roundNumber(number, decimalPlaces) {
      var result = new String((Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)));
      if (decimalPlaces > 0) {
         if (parseInt(result.toString(), 10) == parseFloat(result.toString())) {
            result += ".0";
         }
         while (result.indexOf(".", 0) + decimalPlaces >= result.length) {
            result += "0";
         }
      }
      return result;
   }

   showSnackBar(message: string, duration: number) {
      let config = new MatSnackBarConfig();
      config.duration = duration;
      this.snackBar.open(message, null, config);
   }
}
