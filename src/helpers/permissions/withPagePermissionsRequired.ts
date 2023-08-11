import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';
import { hasPermissions } from './hasPermissions';
import { Permission } from '../../typings/permissions';

type RedirectCallback = (context: GetServerSidePropsContext) => Promise<
    | { props: any }
    | { notFound: true }
    | {
          redirect: {
              permanent: boolean;
              destination: string;
          };
      }
>;

const withPagePermissionsRequired = (permissions: Permission[], redirectCallback?: RedirectCallback) =>
    withPageAuthRequired({
        async getServerSideProps(context: GetServerSidePropsContext) {
            try {
                const { req, res } = context;

                const session = await getSession(req, res);
                if (!session) {
                    return {
                        redirect: {
                            permanent: false,
                            destination: '/',
                        },
                    };
                }

                const isAuthorized = hasPermissions(permissions, session.accessToken);

                if (!isAuthorized) {
                    return {
                        redirect: {
                            permanent: false,
                            destination: '/',
                        },
                    };
                }
                if (redirectCallback) return redirectCallback(context);
                return {
                    props: {},
                };
            } catch (error) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/',
                    },
                };
            }
        },
    });

export default withPagePermissionsRequired;
