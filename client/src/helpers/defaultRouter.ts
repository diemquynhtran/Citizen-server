import { Role } from "settings/role";

export const defaultRouter = (role?: Role) => {
  if (role == undefined) {
    return "/403";
  }
  switch (role as any) {
    case Role.A1:
      return "/admin/A1";
    case Role.A2:
      return "/admin/A2";
    case Role.A3:
      return "/admin/B1";
    case Role.B1:
      return "/admin/B1";
    case Role.B2:
      return "/admin/B2";
    default:
      return "/403";
  }
};
