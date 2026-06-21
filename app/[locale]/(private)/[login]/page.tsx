import ProfilePage from '@/pages/ProfilePage';

export default async function UserProfile({
  params,
}: {
  params: Promise<{ login: string }>;
}) {
  const { login } = await params;

  return <ProfilePage login={login} />;
}
