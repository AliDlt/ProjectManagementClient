import { ColorPicker, Radio } from "antd";
import React from "react";

function CategoryColor({ categoryColor, setCategoryColor }) {
  return (
    <>
      <span>رنگ دسته بندی</span>
      <div className="flex items-center gap-3 mt-3">
        <div>
          <Radio.Group
            className="flex items-center justify-center gap-3"
            onChange={(e) => setCategoryColor({ color: e.target.value })}
            value={categoryColor.color}
          >
            <Radio.Button
              className="rounded-full size-6 flex justify-center items-center bg-red-500 p-0 [&.ant-radio-button-wrapper-checked]:outline-offset-2 [&.ant-radio-button-wrapper-checked]:outline-2 [&.ant-radio-button-wrapper-checked]:outline-red-500 [&.ant-radio-button-wrapper-checked]:outline before:hidden"
              value="#EE4444"
            />
            <Radio.Button
              className="rounded-full size-6 flex justify-center items-center bg-blue-500 p-0 [&.ant-radio-button-wrapper-checked]:outline-offset-2 [&.ant-radio-button-wrapper-checked]:outline-2 [&.ant-radio-button-wrapper-checked]:outline-blue-500 [&.ant-radio-button-wrapper-checked]:outline before:hidden"
              value="#3C81F5"
            />
            <Radio.Button
              className="rounded-full size-6 flex justify-center items-center bg-green-500 p-0 [&.ant-radio-button-wrapper-checked]:outline-offset-2 [&.ant-radio-button-wrapper-checked]:outline-2 [&.ant-radio-button-wrapper-checked]:outline-green-500 [&.ant-radio-button-wrapper-checked]:outline before:hidden"
              value="#21C55E"
            />
            <Radio.Button
              className="rounded-full size-6 flex justify-center items-center bg-yellow-500 p-0 [&.ant-radio-button-wrapper-checked]:outline-offset-2 [&.ant-radio-button-wrapper-checked]:outline-2 [&.ant-radio-button-wrapper-checked]:outline-yellow-500 [&.ant-radio-button-wrapper-checked]:outline before:hidden"
              value="#E9B229"
            />
            <Radio.Button
              className="rounded-full size-6 flex justify-center items-center bg-violet-500 p-0 [&.ant-radio-button-wrapper-checked]:outline-offset-2 [&.ant-radio-button-wrapper-checked]:outline-2 [&.ant-radio-button-wrapper-checked]:outline-violet-500 [&.ant-radio-button-wrapper-checked]:outline before:hidden"
              value="#8B5DF6"
            />
          </Radio.Group>
        </div>
        <div
          className="rounded-full size-6 overflow-hidden flex justify-center items-center  outline-2 outline-offset-2"
          style={{
            outlineColor: categoryColor.customColor,
            outlineStyle: categoryColor.customColor && "solid",
          }}
        >
          <ColorPicker
            allowClear
            onChange={(color) =>
              setCategoryColor({ customColor: color.toHexString() })
            }
            value={categoryColor.customColor}
            showText={({ cleared }) =>
              cleared && <img src="/images/rainbow.jpg" className="size-6" />
            }
          />
        </div>
      </div>
    </>
  );
}

export default CategoryColor;
