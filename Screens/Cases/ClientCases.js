استورد رد فعل ، { مكون } من 'رد فعل';
استيراد من رد فعل أصلي;
استيراد من";
استيراد من firebase;

// todo تنفيذ modal to make add case popp up from the case list
صدر افتراضي الفئة عناصر {
    constructor (props){
        super (props);
        هذا.الدولة = {
            اسم الملف:,
        casedetails: "
    };
    }


    اعرض() {
        العودة (
            أسلوب العرض{{
            مرن: 1,
                flexdirection: 'عمود',
                justifycontent: 'center',
                محاذاة: 'مركز'
        }}>
    < text>name of case< / text>
        < textinput
            حامل المكان= " العنوان"
            onchangetext = {(text) = > this.الولايةاسم الملف = النص}
        />
        < text>case details< / text>
            < textinput
                حامل المكان = " الوصف"
                onchangetext = {(text) = > this.الولايةcasedetails = نص}
            />
            < button onpress={this.submitcase} title= 'submit case' / >
            < button onpress={this.clearaces} عنوان = 'clear cases' / >
            < / عرض>
            )
            }

            submitcase = () => {
            هذاالحالة;
            let user = firebase.auth ().currentuser;
            let casetest = firebase.database().المرجع ("users/" + user.uid + " / cases/");
            كاستيستادفع({
            اسم الملف: اسم الملف,
            casedetails: casedetails
        })
            .ثم () = >{
            تنبيه ("حالة أضيفت بنجاح!");
        })
            .قبض ((خطأ) =>{
            تنبيه خطأ);
        })
        };

            clearcass = () = > {
            let user = firebase.auth ().currentuser;
            let casetest = firebase.database().المرجع ("users/" + user.uid + " / cases/");
            كاستيستضبط({})
            .ثم () = >{
            تنبيه");
        })
            .قبض ((خطأ) =>{
            تنبيه خطأ);
        })
        };
            }
