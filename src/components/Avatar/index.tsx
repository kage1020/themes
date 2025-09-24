import MuiAvatar, {
  type AvatarProps as MuiAvatarProps,
} from "@mui/material/Avatar";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import { getContrastTextColor, stringToHex } from "../../utils/color";

export interface AvatarProps
  extends Omit<MuiAvatarProps, "children" | "slotProps"> {
  slotProps?: MuiAvatarProps["slotProps"] & {
    typography?: TypographyProps;
  };
}

export function Avatar({ sx, src, alt, slotProps, ...props }: AvatarProps) {
  const backgroundColor = alt ? stringToHex(alt) : undefined;
  const textColor = backgroundColor
    ? getContrastTextColor(backgroundColor)
    : undefined;

  return (
    <MuiAvatar
      sx={{ backgroundColor, color: textColor, ...sx }}
      src={src}
      alt={alt}
      slotProps={slotProps}
      {...props}
    >
      {!src && alt && (
        <Typography
          sx={{ width: "1em", whiteSpace: "nowrap", overflow: "hidden" }}
          {...slotProps?.typography}
        >
          {alt}
        </Typography>
      )}
    </MuiAvatar>
  );
}
