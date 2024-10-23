{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            android_sdk.accept_license = true;
            allowUnfree = true;
          };

        };

        pinnedJDK = pkgs.jdk17;

        androidComposition = pkgs.androidenv.composeAndroidPackages {
          buildToolsVersions = [ "34.0.0" "33.0.1" ];
          platformVersions = [ "34"];
          abiVersions = [ "x86_64" ];
          includeEmulator = true;
          emulatorVersion = "33.1.20";
          includeSystemImages = true;
          systemImageTypes = [ "google_apis" ];
          includeNDK = true;
          ndkVersions = ["25.1.8937393" "26.1.10909125"];
          cmakeVersions = [ "3.22.1" "3.10.2" ];
        };
        androidSdk = androidComposition.androidsdk;

      in {
        devShells.default = pkgs.mkShell rec {
          shellHook = ''
            export LD_LIBRARY_PATH="${pkgs.libxml2.out}/lib:$LD_LIBRARY_PATH"
          '';
          ANDROID_SDK_ROOT = "${androidSdk}/libexec/android-sdk";
          GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${androidSdk}/libexec/android-sdk/build-tools/34.0.0/aapt2";
          JAVA_HOME = pinnedJDK;
          packages = with pkgs; [
            nodejs_22
            typescript
            nodePackages.typescript-language-server
            pinnedJDK
          ];
          buildInputs = [
            androidSdk
          ];
        };
      });
}
