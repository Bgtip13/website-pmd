// domMax dibutuhkan untuk `layout` & `layoutId` (tab pill, galeri).
// Di-load async oleh MotionProvider supaya tidak memblokir render pertama.
import { domMax } from "motion/react";
export default domMax;
