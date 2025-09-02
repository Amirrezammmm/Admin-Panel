let values = [];

function styleButton(btn) {
    btn.style.backgroundColor = "#0b5ed7";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.padding = "5px 10px";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    return btn;
}

function save(data = values) {
    // اگر data خالی بود جدول خالی نمایش داده نشود
    if (!data.length) {
        document.getElementById("pnameTable").innerHTML = "";
        return;
    }

    // اگر data همان values است، باید آی‌دی‌ها را بروزرسانی کنیم
    if (data === values) {
        values = values.map((item, index) => ({
            id: index + 1,
            name: item.name,
            price: item.price
        }));
        data = values;
    }

    let container = document.getElementById("pnameTable");
    container.innerHTML = "";

    const table = document.createElement("table");
    table.border = "1";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    Object.keys(data[0]).forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });

    const statusTh = document.createElement("th");
    statusTh.textContent = "status";
    headerRow.appendChild(statusTh);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    data.forEach((item, index) => {
        const row = document.createElement("tr");

        Object.values(item).forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        const actionTd = document.createElement("td");

        // دکمه حذف
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.onclick = function () {
            // حذف از آرایه اصلی values
            const idx = values.findIndex(v => v.id === item.id);
            if (idx > -1) {
                values.splice(idx, 1);
                save();
            }
        };
        styleButton(deleteBtn);
        deleteBtn.style.marginRight = "5px";
        actionTd.appendChild(deleteBtn);

        // دکمه ویرایش
        const editBtn = document.createElement("button");
        editBtn.textContent = "edit";
        editBtn.onclick = function () {
            row.innerHTML = "";

            const idTd = document.createElement("td");
            idTd.textContent = item.id;
            row.appendChild(idTd);

            const nameInput = document.createElement("input");
            nameInput.value = item.name;
            const nameTd = document.createElement("td");
            nameTd.appendChild(nameInput);
            row.appendChild(nameTd);

            const priceInput = document.createElement("input");
            priceInput.type = "number";
            priceInput.value = item.price;
            const priceTd = document.createElement("td");
            priceTd.appendChild(priceInput);
            row.appendChild(priceTd);

            const updateTd = document.createElement("td");
            const updateBtn = document.createElement("button");
            updateBtn.textContent = "update";
            updateBtn.onclick = function () {
                const idx = values.findIndex(v => v.id === item.id);
                if (idx > -1) {
                    values[idx].name = nameInput.value;
                    values[idx].price = priceInput.value;
                    save();
                }
            };
            styleButton(updateBtn);
            updateTd.appendChild(updateBtn);
            row.appendChild(updateTd);
        };
        styleButton(editBtn);
        actionTd.appendChild(editBtn);

        row.appendChild(actionTd);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);

    // پاک کردن ورودی‌ها فقط وقتی data همان values است (یعنی حالت ذخیره اصلی)
    if (data === values) {
        document.getElementById("pname").value = "";
        document.getElementById("price").value = "";
    }

    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.padding = "20px";
    table.style.width = "100%";
    table.style.padding = "20px";

    // استایل جدول
    table.style.borderCollapse = "collapse";
    table.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    table.style.backgroundColor = "#ffffff";
    table.style.fontFamily = "Arial, sans-serif";

    // عنوان جدول
    thead.style.backgroundColor = "#0b5ed7";
    thead.style.color = "white";

    // سلول‌ها
    Array.from(table.querySelectorAll("th, td")).forEach(cell => {
        cell.style.padding = "10px";
        cell.style.textAlign = "center";
        cell.style.border = "1px solid #ddd";
    });

    // ردیف‌های زیگ‌زاگی
    Array.from(tbody.rows).forEach((row, index) => {
        row.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff";
    });

    // بستن مودال پس از ذخیره (فقط وقتی داده اصلی است)
    if (data === values) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('basicModal'));
        if (modal) modal.hide();
    }
}

function addValue() {
    let pname = document.getElementById("pname").value.trim();
    let price = document.getElementById("price").value.trim();

    if (pname && price) {
        values.push({ name: pname, price: price });
        save();
    }
}

function searchvalue() {
    let searchValue = document.getElementById("search").value.trim().toLowerCase();


    let filtered = values.filter(item =>
        item.name.toLowerCase().includes(searchValue)
    );

    save(filtered);
}
