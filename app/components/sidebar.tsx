import React, { useEffect, useState } from "react";
import { DropdownBox } from "./dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";

export const SideBarSection: React.FC<{
  allSegments: {
    id: number;
    label: string;
    value: string;
  }[];
  setOpen: (val: boolean) => void;
}> = ({ allSegments, setOpen }) => {
  const [segmentName, setSegmentName] = useState("");
  const [seletedItem, setSeletedItem] = useState("No value");
  const [unSelectedSegments, setUnSelectedSegments] = useState(allSegments);
  const [selectedSegments, setSelectedSegments] = useState<
    {
      id: number;
      label: string;
      value: string;
    }[]
  >([{ id: 0, label: "No value", value: "No value" }]);

  const handleAddSegment = () => {
    if (seletedItem === "No value") {
      return alert("Nothing is selected");
    }
    const addItem = unSelectedSegments.filter(
      (segment) => segment.value === seletedItem
    );
    setSelectedSegments((selectedSegments) => [
      ...selectedSegments,
      ...addItem,
    ]);
  };

  const handleSelectedSegment = (prev: string, value?: string) => {
    const prevItem = selectedSegments.filter(
      (segment) => segment.value === prev
    );
    const editedItem = unSelectedSegments.filter((dt) => dt.value === value)[0];
    const segmentsAfterEdited = selectedSegments.map((dt) =>
      dt.value === prev ? editedItem : dt
    );

    const segmentsAfterRemoved = selectedSegments.filter(
      (data) => data.value !== prev
    );
    setUnSelectedSegments((unSelectedSegments) => [
      ...unSelectedSegments,
      ...prevItem,
    ]);

    setSelectedSegments(value ? segmentsAfterEdited : segmentsAfterRemoved);
  };

  const handleSubmit = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSegments
        .filter((item) => item.value !== "No value")
        .map((dt) => {
          let items = {};
          items = { [dt.value]: dt.label };
          return items;
        }),
    };
    console.log("data::::", data);
    const webhookUrl =
      "https://webhook.site/41008ac9-a480-40f3-bcee-abad48fc4d5e";
    // await axios
    //   .post("https://webhook.site/41008ac9-a480-40f3-bcee-abad48fc4d5e", data, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   })
    //   .then((response) => console.log(response.data))
    //   .then((error) => console.log(error));
    try {
      const response = await axios.post(webhookUrl, data);
      if (response.status === 200) {
        console.log("Success!");
      } else {
        console.log("Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Error occurred!");
    }
  };

  useEffect(() => {
    const removeItem = unSelectedSegments.filter(
      (dt) => !selectedSegments.some((item) => dt.value === item.value)
    );
    setUnSelectedSegments(removeItem);
    setSeletedItem("No value");
  }, [selectedSegments, setSelectedSegments]);

  return (
    <div className="h-screen absolute right-0 w-96 shadow-2xl bg-white ">
      <div className="flex items-center gap-2 bg-[#39aebc] text-lg text-white p-4">
        <Icon
          icon="fe:arrow-left"
          color="white"
          fontSize={25}
          onClick={() => setOpen(false)}
        />{" "}
        Saving Segment
      </div>
      <div className="px-5 py-8">
        <h4>Enter the Name of the Segment</h4>
        <input
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          placeholder="Name of the segment"
          className="border outline-none px-2 py-2.5 w-full my-5 border-black"
        />
        <div>
          To save your segment,you need to add the schemas to build the query
        </div>
      </div>
      <div className="px-5">
        {selectedSegments.length > 1 ? (
          <div className="border-2 px-2 border-[#a7cae9] mb-5">
            {selectedSegments.map((segment) => {
              if (segment.label !== "No value") {
                return (
                  <DropdownBox
                    currentSelectedItem={segment.label}
                    setCurrentSelectedItem={handleSelectedSegment}
                    segments={unSelectedSegments}
                    key={segment.id}
                    currentSchema={segment}
                  />
                );
              }
            })}
          </div>
        ) : null}
        <DropdownBox
          currentSelectedItem={seletedItem}
          setCurrentSelectedItem={setSeletedItem}
          segments={unSelectedSegments}
        />

        <button
          className="text-[#71c9b1] border-b border-[#71c9b1] text-lg mt-5"
          onClick={() => handleAddSegment()}
        >
          + Add new schema
        </button>
      </div>
      <div className="bg-[#f6f6f6] px-4 py-5 flex gap-5 fixed w-full bottom-0">
        <button
          className="text-white font-semibold  bg-[#41b494] px-4 py-3 rounded"
          onClick={() => handleSubmit()}
        >
          Save the Segment
        </button>
        <button
          className="text-red-600 font-semibold  bg-white px-4 py-3 rounded"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
