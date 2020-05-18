import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { render, unmountComponentAtNode } from "react-dom";
import { Route, MemoryRouter, useParams } from "react-router-dom";
import ImageView from "./ImageView";
import renderStrict from "../utils/renderStrict.js";

describe("ImageView renders the correct path", () => {
  const node = document.createElement("div");

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("when the path has no params", () => {
    it("returns an empty hash", () => {
      let params;

      const ImageView = () => {
        params = useParams();
        return null;
      };

      renderStrict(
        <MemoryRouter initialEntries={[""]}>
          <Route path="">
            <ImageView />
          </Route>
        </MemoryRouter>,
        node
      );

      expect(typeof params).toBe("object");
      expect(Object.keys(params)).toHaveLength(0);
    });
  });

  describe("when the path has some params", () => {
    it("returns a hash of the URL params and their values", () => {
      let params;

      const ImageView = () => {
        params = useParams();
        return null;
      };

      renderStrict(
        <MemoryRouter initialEntries={["/1004/image/123213"]}>
          <Route path="/:id/image/:photoId">
            <ImageView />
          </Route>
        </MemoryRouter>,
        node
      );

      expect(typeof params).toBe("object");
      expect(params).toMatchObject({
        id: "1004",
        photoId: "123213",
      });
    });
  });
});

describe("ImageView component", function () {
  let wrapper = shallow(
    <MemoryRouter initialEntries={["/1004/", "123213"]}>
      <Route path="/:id/image/:photoId">
        <ImageView />
      </Route>
    </MemoryRouter>
  );

  console.log(wrapper.debug());

  it("should render all elements correctly without throwing an error", function () {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("ImageView").length).toBe(1);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
