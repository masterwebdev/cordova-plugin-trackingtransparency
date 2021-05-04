#import <Cordova/CDV.h>

@interface trackingtransparency : CDVPlugin

- (void)getInfo:(CDVInvokedUrlCommand*)command;

- (void)requestPermission:(CDVInvokedUrlCommand*)command;

@end
