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

const RED = "#9E1B26";
const RED_DARK = "#7D1520";
const CREAM = "#FAF6ED";
const INK = "#2A0A0D";

const links = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/room" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const tel = `tel:${PHONE_MOBILE.replace(/\s/g, "")}`;

const callSx = {
  bgcolor: RED,
  color: CREAM,
  fontWeight: 700,
  borderRadius: 0,
  px: 2.5,
  "&:hover": { bgcolor: RED_DARK },
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
          bgcolor: CREAM,
          color: INK,
          borderBottom: `2px solid ${RED}`,
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
                    color: active ? RED : INK,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    px: 2,
                    borderRadius: 0,
                    borderBottom: `2px solid ${active ? RED : "transparent"}`,
                    "&:hover": { color: RED, bgcolor: "transparent" },
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
              color: RED,
              border: `1px solid ${RED}`,
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
              bgcolor: CREAM,
              color: INK,
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
            sx={{ color: RED }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(158,27,38,0.35)" }} />
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
                borderBottom: "1px solid rgba(158,27,38,0.15)",
              }}
            >
              <Box
                sx={{
                  color: RED,
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
                      color: pathname === l.href ? RED : INK,
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
