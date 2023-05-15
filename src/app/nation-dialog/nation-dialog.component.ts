/**
 * Description: The TypeScript file of the web application that displays each nation's detailed
 *              information using the data retrieved from app.component.html file. It will display
 *              country code, continent, region, surface area, population, map, and major cities in
 *              table.
 * Date: August 14, 2022
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nation-dialog',
  templateUrl: './nation-dialog.component.html',
  styleUrls: ['./nation-dialog.component.css']
})
export class NationDialogComponent implements OnInit {

  // properties
  nation: any;  // selected country info
  map = "";   // URL for map image file
  cities: any = [];
  headers = ["Name", "District", "Population"];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, http: HttpClient) {
    // get data from the parent
    this.nation = data;

    // construct the jmap name
    this.map = "assets/maps/" + this.nation.Code.toLowerCase() + ".gif";

    // fetch JSON data
    const URL = "./assets/city.json";
    http.get(URL).subscribe(  // observable as 'subscribe'. asynchronous
      {
        // success
        next: (json: any) => {
          this.cities = json.City.filter((city: any) => city.CountryCode === this.nation.Code);
          console.log("Loaded Json: " + this.cities);
        },
        // failed
        error: (err: any) => {
          console.log("[ERROR] " + err.message);
        }
      });
  }
  ngOnInit(): void {
  }
}
