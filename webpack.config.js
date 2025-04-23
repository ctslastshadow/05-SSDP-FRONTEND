
const { shareAll, share, withModuleFederationPlugin, SharedMappings } = require('@angular-architects/module-federation/webpack');

 const moduleFederationConfig = withModuleFederationPlugin({

    name: '05-SDP-NEW',

    exposes: {
        './TemplateModule': './src/presentation/app/template/template.module.ts',
    },

    /* shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    }, */
    shared: share({
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
        "@angular/common/http": { singleton: true, strictVersion: true },
        //"@mycne/lib-design-system":  { singleton: true, strictVersion: true, requiredVersion: '0.0.12' },
        rxjs: {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            includeSecondaries: true
        }
      }),
});
moduleFederationConfig.output.publicPath = 'http://localhost:4201/mf-sdp/';
//moduleFederationConfig.output.publicPath = 'https://frontend-apps-desa.cne.gob.ec/mf-sdp/' //Desa
//moduleFederationConfig.output.publicPath = 'https://frontend-apps-test.cne.gob.ec/mf-sdp/' //test
// moduleFederationConfig.output.publicPath = 'https://frontend-apps.cne.gob.ec/mf-sdp/' //prod


module.exports = moduleFederationConfig;