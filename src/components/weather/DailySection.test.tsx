// Import the necessary modules
import React from "react";
import { render, screen } from "@testing-library/react";
import DailySection from "./DailySection";
import { fakeWeatherData } from "../../mocks/fakeWeatherData";

// Write your tests
describe("DailySection", () => {
  test("renders without crashing", () => {
    render(<DailySection weatherData={fakeWeatherData} />);
    screen.debug();
    expect(
      screen.getByText("There will be partly cloudy with snow until morning, then partly cloudy with rain")
    ).toBeTruthy();
  });

  // Add more tests here
});
