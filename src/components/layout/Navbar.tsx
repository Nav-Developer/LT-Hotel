"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import assets from "@/assets";
import { PHONE_MOBILE } from "@/data/constant";

const MAROON = "#5C0011";
const MAROON_DARK = "#2E0008";
const GOLD = "#F5B82E";
const CREAM = "#FFF8EA";

const links = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/room" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const tel = `tel:${PHONE_MOBILE.replace(/\s/g, "")}`;

const callSx = {
  bgcolor: GOLD,
  color: MAROON_DARK,
  fontWeight: 700,
  borderRadius: 0,
  px: 2.5,
  "&:hover": { bgcolor: "#fff" },
};

function Logo({ h }: { h: number }) {
  return (
    <Box
      sx={{ position: "relative", height: h, width: h * 1.5, flexShrink: 0 }}
    >
      <Image
        src={assets.images.logo}
        alt="LT Lodge Hotel"
        fill
        priority
        sizes="120px"
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: MAROON,
          color: CREAM,
          borderBottom: `2px solid ${GOLD}`,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 76 },
            justifyContent: "space-between",
            maxWidth: 1280,
            width: "100%",
            mx: "auto",
          }}
        >
          <Link href="/" aria-label="LT Lodge home" style={{ display: "flex" }}>
            <Logo h={48} />
          </Link>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Button
                  key={l.href}
                  component={Link}
                  href={l.href}
                  disableRipple
                  sx={{
                    color: active ? GOLD : CREAM,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    px: 2,
                    borderRadius: 0,
                    borderBottom: `2px solid ${active ? GOLD : "transparent"}`,
                    "&:hover": { color: GOLD, bgcolor: "transparent" },
                  }}
                >
                  {l.label}
                </Button>
              );
            })}
            <Button
              href={tel}
              startIcon={<CallIcon />}
              sx={{ ml: 2, ...callSx }}
            >
              {PHONE_MOBILE}
            </Button>
          </Box>

          <IconButton
            aria-label="open menu"
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: GOLD,
              border: `1px solid ${GOLD}`,
              borderRadius: 0,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "80vw",
              maxWidth: 340,
              bgcolor: MAROON_DARK,
              color: CREAM,
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
          }}
        >
          <Logo h={44} />
          <IconButton
            aria-label="close menu"
            onClick={() => setOpen(false)}
            sx={{ color: GOLD }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(245,184,46,0.4)" }} />
        <List sx={{ px: 2.5 }}>
          {links.map((l, i) => (
            <ListItemButton
              key={l.href}
              component={Link}
              href={l.href}
              onClick={() => setOpen(false)}
              sx={{
                px: 0,
                py: 2,
                borderBottom: "1px solid rgba(255,248,234,0.12)",
              }}
            >
              <Box
                sx={{
                  color: GOLD,
                  fontSize: "0.75rem",
                  mr: 2,
                  fontWeight: 700,
                }}
              >
                0{i + 1}
              </Box>
              <ListItemText
                primary={l.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontFamily: "var(--font-bodoni), serif",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: pathname === l.href ? GOLD : CREAM,
                    },
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ px: 2.5, mt: 2 }}>
          <Button
            href={tel}
            fullWidth
            size="large"
            startIcon={<CallIcon />}
            sx={callSx}
          >
            Call to book
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
