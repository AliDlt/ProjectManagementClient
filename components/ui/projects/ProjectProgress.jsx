import { Progress } from "antd";
import React from "react";
import cn from "../../../utils/cn";

function ProjectProgress({ className, progress, projectIndex, ...rest }) {
  return (
    <Progress
      className={cn([
        "[&_.ant-progress-inner]:!size-20 [&_.ant-progress-inner]:xl:!size-32",
        projectIndex % 2 === 0
          ? "[&_.ant-progress-text]:text-custom-primary-color"
          : "[&_.ant-progress-text]:text-custom-secondary-color",
        className,
      ])}
      strokeLinecap="butt"
      type="circle"
      percent={progress}
      strokeWidth={15}
      strokeColor={
        projectIndex % 2 === 0
          ? "rgb(var(--primary-color))"
          : "rgb(var(--secondary-color))"
      }
      trailColor={
        projectIndex % 2 === 0
          ? "rgb(var(--primary-color) / 0.2)"
          : "rgb(var(--secondary-color)  / 0.2)"
      }
      {...rest}
    />
  );
}

export default ProjectProgress;
