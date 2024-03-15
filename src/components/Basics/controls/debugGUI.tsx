"use client";
import { useState } from "react";
import {
  GuiPanel,
  GuiButton,
  GuiCheckbox,
  GuiRange,
  GuiFolder,
  GuiColor,
  GuiSelect,
  GuiInterval,
  GuiText,
  GuiTitle,
  GuiDisplay,
  GuiFile,
} from "react-guify";
const initial = {
  x: 0,
}
export default function DebugGUI() {
  const [state, setState] = useState(initial);
}
