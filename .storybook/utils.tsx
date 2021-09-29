import React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

const getClassNames = (): string => {
    let classNames: string[] = [];
    classNames.push('theme-default');
    classNames.push('desktop-web');
    return classNames.join(' ');
};

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withThemeWrapper = <TProps extends object>(WrappedComponent: React.ComponentType<TProps>): React.FC => {
    const wrapper = (props) => (
        <Provider
            theme={teamsTheme} // teamsTheme | teamsDarkTheme | teamsHighContrastTheme
            rtl={false}
        >
            <WrappedComponent {...props} />
        </Provider>
    );
    wrapper.displayName = `withTheme(${getDisplayName(WrappedComponent)})`;
    return wrapper;
};
