import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as useFetchPhotos from "./useFetchPhotos";

describe("useFetchPhotos", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  it("performs a GET request", async () => {
    const initialValue = [];
    const mock = new MockAdapter(axios);

    const mockData = "response";
    const id = "1001";
    mock
      .onGet(`http://localhost:5000/listings/${id}/photos`)
      .reply(200, mockData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchPhotos.default(id)
    );

    expect(result.current.photos).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.photos).toEqual("response");
  });
});
