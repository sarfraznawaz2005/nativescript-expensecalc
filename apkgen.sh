##################################
# variables
##################################
ALIAS="io.github.codeinphp.expensecalc"
KEYSTOREPATH=keystore
##################################

read -p "Password: " PASSWORD

rm -f $KEYSTOREPATH

# generate key
keytool -genkey -v -keystore $KEYSTOREPATH -alias $ALIAS -keyalg RSA -keysize 2048 -validity 20000 -keypass $PASSWORD -storepass $PASSWORD -destkeystore keystore -deststoretype pkcs12

echo

# generate apk
tns build android --release --clean --key-store-path $KEYSTOREPATH --key-store-password $PASSWORD --key-store-alias $ALIAS --key-store-alias-password $PASSWORD
