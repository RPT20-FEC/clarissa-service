import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { render, unmountComponentAtNode } from "react-dom";
import { Route, MemoryRouter, useParams } from "react-router-dom";
import Gallery from "../../client/components/gallery";
import renderStrict from "../../client/utils/renderStrict.js";

describe("Gallery renders the correct path", () => {
  const node = document.createElement("div");

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("when the path has no params", () => {
    it("returns an empty hash", () => {
      let params;

      const Gallery = () => {
        params = useParams();
        return null;
      };

      renderStrict(
        <MemoryRouter initialEntries={[""]}>
          <Route path="">
            <Gallery />
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

      const Gallery = () => {
        params = useParams();
        return null;
      };

      renderStrict(
        <MemoryRouter initialEntries={["/1004/"]}>
          <Route path="/:id/">
            <Gallery />
          </Route>
        </MemoryRouter>,
        node
      );

      expect(typeof params).toBe("object");
      expect(params).toMatchObject({
        id: "1004",
      });
    });
  });
});

describe("Gallery component", function () {
  let wrapper = shallow(
    <MemoryRouter initialEntries={["/1004/"]}>
      <Route path="/:id/">
        <Gallery />
      </Route>
    </MemoryRouter>
  );

  it("should render all elements correctly without throwing an error", function () {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("Gallery").length).toBe(1);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
