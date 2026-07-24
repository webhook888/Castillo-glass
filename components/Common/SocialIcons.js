"use client";

import { HStack, IconButton, Link } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaAmazon,
} from "react-icons/fa";
import { SOCIAL_LINKS } from "@/constants/site";

const ICONS = {
  facebook: FaFacebookF,
  youtube: FaYoutube,
  instagram: FaInstagram,
  pinterest: FaPinterestP,
  amazon: FaAmazon,
};

export default function SocialIcons({ size = "44px", rounded = "md", ...rest }) {
  return (
    <HStack spacing={3} {...rest}>
      {SOCIAL_LINKS.map((social) => {
        const IconComp = ICONS[social.icon];
        return (
          <IconButton
            as={Link}
            key={social.icon}
            href={social.href}
            aria-label={social.label}
            icon={<IconComp />}
            bg={social.bg}
            border={social.border}
            borderRadius={social.raduis}
            color={social.color}
    
            w={size}
            h={size}
            minW={size}
            _hover={{ bg:'#e3e3e359' }}
          />
        );
      })}
    </HStack>
  );
}
