import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

const avatarSizes = cva(
  "rounded-full bg-gray-100 overflow-clip flex items-center justify-center",
  {
    variants: {
      variant: {
        "2xs": "!size-[20px]",
        xs: "!size-[32px]",
        base: "!size-[40px]",
        sm: "!size-[48px]",
        lg: "!size-[56px]",
        xl: "!size-[80px]",
        "2xl": "!size-[96px]",
      },
      size: {
        default: "h-9",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "base",
      size: "default",
    },
  }
);

export interface AvatarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof avatarSizes> {
  name?: string;
  img?: string | null;
  role?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, variant, size, name, role, img }) => {
    return (
      <div className="flex w-full items-center justify-start gap-4">
        <div className={cn(avatarSizes({ variant, size, className }))}>
          {img ? (
            <img src={img} alt={name} className="size-full object-cover" />
          ) : (
            <FiUser className="text-neutral-400" />
          )}
        </div>
        {name && (
          <div>
            <p className="font-medium">{name}</p>
            {role && <p className="text-neutral-500">{role}</p>}
          </div>
        )}
      </div>
    );
  }
);
export const MyAvatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, variant, size, name, role }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
      <div className="flex w-full items-center justify-start gap-4">
        <div className={cn(avatarSizes({ variant, size, className }))}>
          {user?.avatarUrl ? (
            <img
              src={user?.avatarUrl || undefined}
              alt={name}
              className="size-full object-cover"
            />
          ) : (
            <FiUser className="text-neutral-400" />
          )}
        </div>
        {name && (
          <div>
            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            {role && <p className="text-neutral-500 truncate">{user?.bio}</p>}
          </div>
        )}
      </div>
    );
  }
);
