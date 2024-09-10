import React from "react";

export const DropdownBox: React.FC<{
  currentSelectedItem: string;
  setCurrentSelectedItem: (val: string, str?: string) => void;
  segments: {
    id: number;
    label: string;
    value: string;
  }[];
  currentSchema?: {
    id: number;
    label: string;
    value: string;
  };
}> = ({
  currentSelectedItem,
  setCurrentSelectedItem,
  segments,
  currentSchema,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentSchema) {
      setCurrentSelectedItem(currentSchema.value, e.target.value);
    } else {
      setCurrentSelectedItem(e.target.value);
    }
  };
  const handleRemoval = () => {
    if (currentSchema) {
      setCurrentSelectedItem(currentSchema.value);
    } else {
      setCurrentSelectedItem("No value");
    }
  };
  return (
    <div className="flex items-center gap-2 px-2 my-2">
      <select
        className="border outline-none px-2 py-2.5 w-full border-black "
        onChange={(e) => handleChange(e)}
        value={currentSelectedItem}
      >
        {currentSchema ? (
          <option value={currentSchema.value}>{currentSchema.label}</option>
        ) : (
          <option value="No value">Add schema to segment</option>
        )}
        {segments.map((dt) => {
          return (
            <option value={dt.value} key={dt.id}>
              {dt.label}
            </option>
          );
        })}
      </select>
      <div
        className="w-10 h-10 bg-[#f2fbf9] flex items-center justify-center"
        onClick={() => handleRemoval()}
      >
        <span className="border-2 w-3 border-[#72859c] rounded-2"></span>
      </div>
    </div>
  );
};
