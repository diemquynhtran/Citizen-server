import { Role } from "settings/role";

export const searchPersonRouter = (role?: Role) => {
  if (role === undefined) {
    return "/403";
  }
  switch (role as any) {
    case Role.A1:
      return "/searchperson/A1";
    case Role.A2:
      return "/searchperson/A2";
    case Role.A3:
      return "/searchperson/A3";
    case Role.B1:
      return "/searchperson/B1";
    case Role.B2:
      return "/searchperson/B2";
    default:
      return "/403";
  }
};
