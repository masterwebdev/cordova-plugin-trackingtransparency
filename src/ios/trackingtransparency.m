#import "trackingtransparency.h"
#import <AppTrackingTransparency/AppTrackingTransparency.h>

@implementation trackingtransparency

- (void)getInfo:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate runInBackground:^{
        NSDictionary* resultData;

        if (@available(iOS 14, *)) {
            NSNumber* trackingPermission = @(ATTrackingManager.trackingAuthorizationStatus);
            resultData = @{
                @"trackingPermission": trackingPermission
            };
        } else {
            resultData = @{
                @"trackingPermission": @3
            };
        }

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultData];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)requestPermission:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate runInBackground:^{
        if (@available(iOS 14, *)) {
            [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                CDVPluginResult* pluginResult =
                    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsNSUInteger:status];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }];
        } else {
            CDVPluginResult* pluginResult = [CDVPluginResult
                                             resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:@"requestPermission is supported only for iOS >= 14"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }];
}

@end
