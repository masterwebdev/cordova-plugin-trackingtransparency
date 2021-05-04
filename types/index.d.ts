type TrackingPermission = 0 | 1 | 2 | 3;

interface trackingtransparencyData {
    /**
     * Tracking permission status _(iOS only)_. Available only for iOS 14+ devices.
     *
     * For the meaning of the values see
     * [the tracking transparency API docs](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus).
     */
    trackingPermission?: TrackingPermission;

    aaid?: string;
}

interface trackingtransparency {
    /**
     * Tracking permission value for the ["not determined" status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus/attrackingmanagerauthorizationstatusnotdetermined).
     */
    readonly TRACKING_PERMISSION_NOT_DETERMINED: 0;
    /**
     * Tracking permission value for the ["restricted" status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus/attrackingmanagerauthorizationstatusrestricted).
     */
    readonly TRACKING_PERMISSION_RESTRICTED: 1;
    /**
     * Tracking permission value for the ["permission denied" status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus/attrackingmanagerauthorizationstatusdenied).
     */
    readonly TRACKING_PERMISSION_DENIED: 2;
    /**
     * Tracking permission value for the ["authorized" status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus/attrackingmanagerauthorizationstatusauthorized).
     */
    readonly TRACKING_PERMISSION_AUTHORIZED: 3;

    getInfo(): Promise<trackingtransparencyData>;

    /**
     * _(iOS only)_ A one-time request to authorize or deny access to app-related data
     * that can be used for tracking the user or the device. See
     * [Apple's API docs](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/3547037-requesttrackingauthorization)
     * for more info.
     *
     * **Note:** You should make sure to set the `NSUserTrackingUsageDescription` key in your app's
     * Information Property List file, otherwise your app will crash when you use this API. See
     * [Apple's API docs](https://developer.apple.com/documentation/bundleresources/information_property_list/nsusertrackingusagedescription)
     * for more info.
     *
     * @returns A promise with the user's tracking permission choice. Available only for iOS 14+ devices.
     * On devices with iOS < 14 the returned promise will be rejected.
     * For the meaning of the returned values see
     * [the tracking transparency API docs](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus).
     *
     * @example
     *
     * // config.xml
     * <platform name="ios">
     *     <edit-config target="NSUserTrackingUsageDescription" file="*-Info.plist" mode="merge">
     *         <string>My tracking usage description</string>
     *     </edit-config>
     * </platform>
     *
     * // index.ts
     * cordova.plugins.trackingtransparency.requestPermission().then((status) => {
     *     console.log(status === cordova.plugins.trackingtransparency.TRACKING_PERMISSION_AUTHORIZED);
     * });
     */
    requestPermission(): Promise<TrackingPermission | null>;
}

interface CordovaPlugins {
    trackingtransparency: trackingtransparency;
}
