import {
  PiChatDuotone,
  PiGearSixDuotone,
  PiHeartDuotone,
  PiPauseDuotone,
  PiSignOut,
  PiStarDuotone,
  PiTrashDuotone,
  PiUserSwitchDuotone,
} from 'react-icons/pi';
import { Avatar, AvatarProps, ElementProps, Menu } from '@mantine/core';
import { useAuth, useLogout } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { removeClientAccessToken } from '@/api/axios';
import { loadUserid } from '@/store/interactions';

type CurrentUserProps = Omit<AvatarProps, 'src' | 'alt'> & ElementProps<'div', keyof AvatarProps>;

export function CurrentUser(props: CurrentUserProps) {
  const dispatch = useDispatch();
  const { mutate: logout } = useLogout();
  const { setIsAuthenticated } = useAuth();
  const handleLogout = () => {
    setIsAuthenticated(false);
    removeClientAccessToken();
    loadUserid({}, dispatch);
  };

  const user = useSelector((state: any) => state.provider.user);

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          src={user?.image ?? null}
          alt={user?.displayName ?? 'Current user'}
          {...props}
          style={{ cursor: 'pointer', ...props.style }}
          size={'48px'}
        ></Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
        //  leftSection={<PiHeartDuotone size="1rem" color="var(--mantine-color-red-6)" />}
        >
          {user?.name}
        </Menu.Item>
        <Menu.Item
        //  leftSection={<PiHeartDuotone size="1rem" color="var(--mantine-color-red-6)" />}
        >
          {user?.phoneNumber}
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item leftSection={<PiSignOut size="1rem" />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
