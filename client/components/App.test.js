import React from "react";
import { shallow } from "enzyme";
import App from "./App";

let wrapper = shallow(<App />);

describe("when it renders", () => {
  it("renders the router components", () => {
    expect(wrapper.find("BrowserRouter").length).toBe(1);
    expect(wrapper.find("Switch").length).toBe(1);
    expect(wrapper.find("Route").length).toBe(3);
    expect(wrapper.find("Gallery").length).toBe(1);
    expect(wrapper.find("ImageView").length).toBe(1);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
